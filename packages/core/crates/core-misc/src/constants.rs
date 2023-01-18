/// Interval to run heartbeat rounds, must include enough
/// time to traverse NATs
pub const DEFAULT_HEARTBEAT_INTERVAL: u32 = 60000;
/// Time after which the availability of a node gets rechecked
pub const DEFAULT_HEARTBEAT_THRESHOLD: u32 = 60000;
/// Randomization of the heartbeat interval to make sure not
/// all of the nodes start their interval at the same time
pub const DEFAULT_HEARTBEAT_INTERVAL_VARIANCE: u32 = 2000;
/// Network quality threshold from which a node is considered
/// available enough to be used
pub const DEFAULT_NETWORK_QUALITY_THRESHOLD: f32 = 0.5;

#[cfg(feature = "wasm")]
pub mod wasm {
    // Need to load as wasm_bindgen to make field annotations work
    use utils_proc_macros::wasm_bindgen_if as wasm_bindgen;

    #[wasm_bindgen]
    pub struct CoreConstants {
        #[wasm_bindgen(readonly, js_name = "DEFAULT_HEARTBEAT_INTERVAL")]
        pub default_heartbeat_interval: u32,
        #[wasm_bindgen(readonly, js_name = "DEFAULT_HEARTBEAT_THRESHOLD")]
        pub default_heartbeat_threshold: u32,
        #[wasm_bindgen(readonly, js_name = "DEFAULT_HEARTBEAT_INTERVAL_VARIANCE")]
        pub default_heartbeat_interval_variance: u32,
        #[wasm_bindgen(readonly, js_name = "DEFAULT_NETWORK_QUALITY_THRESHOLD")]
        pub default_network_quality_threshold: f32,
    }

    /// Returns a struct with readonly constants, needs to be a function
    /// because Rust does not support exporting constants to WASM
    #[wasm_bindgen(js_name = "CORE_CONSTANTS")]
    pub fn get_constants() -> CoreConstants {
        CoreConstants {
            default_heartbeat_interval: super::DEFAULT_HEARTBEAT_INTERVAL,
            default_heartbeat_threshold: super::DEFAULT_HEARTBEAT_THRESHOLD,
            default_heartbeat_interval_variance: super::DEFAULT_HEARTBEAT_INTERVAL_VARIANCE,
            default_network_quality_threshold: super::DEFAULT_NETWORK_QUALITY_THRESHOLD,
        }
    }
}