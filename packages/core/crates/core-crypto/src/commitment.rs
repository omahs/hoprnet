use crate::parameters;

use blake2::Blake2s256;
use hkdf::SimpleHkdf;
use hmac::{SimpleHmac, Mac};

pub fn derive_commitment_seed(private_key: &[u8], channel_info: &[u8]) -> Result<Box<[u8]>, String> {

    // Create HKDF instance and call the `expand` on with the given private key
    let hkdf = SimpleHkdf::<Blake2s256>::from_prk(private_key)
        .map_err(|e| e.to_string())?;

    let mut generated_key = [0u8; parameters::SECRET_KEY_LENGTH];

    hkdf.expand(parameters::HASH_KEY_COMMITMENT_SEED.as_bytes(), &mut generated_key)
        .map_err(|e| e.to_string())?;

    // Create HMAC instance and derive the commitment seed
    let mut mac = SimpleHmac::<Blake2s256>::new_from_slice(&generated_key)
        .map_err(|e| e.to_string())?;

    mac.update(channel_info);
    let mac_value = mac.finalize().into_bytes();

    Ok(mac_value.as_slice().into())
}

pub mod wasm {
    use wasm_bindgen::prelude::*;
    use wasm_bindgen::JsValue;
    use crate::utils::as_jsvalue;

    #[wasm_bindgen]
    pub fn derive_commitment_seed(private_key: &[u8], channel_info: &[u8]) -> Result<Box<[u8]>, JsValue> {
        super::derive_commitment_seed(private_key, channel_info).map_err(as_jsvalue)
    }
}

#[cfg(test)]
mod tests {
    use hex_literal::hex;
    use super::*;

    #[test]
    fn test_derive_commitment_seed() {

        let priv_key = [0u8; parameters::SECRET_KEY_LENGTH];
        let chinfo = [0u8; parameters::SECRET_KEY_LENGTH];

        let res = derive_commitment_seed(&priv_key, &chinfo);
        assert_eq!(false, res.is_err());

        let r = hex!("6CBD916300C24CC0DA636490668A4D85A4F42113496FCB452099F76131A3662E");
        assert_eq!(r, res.unwrap().as_ref());
    }
}