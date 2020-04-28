import type { Types } from "@hoprnet/hopr-core-connector-interface"
import { Uint8ArrayE } from '../types/extended'
import { SIGNATURE_LENGTH, SIGNATURE_RECOVERY_LENGTH } from '../constants'

class Signature extends Uint8ArrayE implements Types.Signature {
  constructor(
    arr?: {
      bytes: ArrayBuffer
      offset: number
    },
    struct?: {
      signature: Uint8Array
      recovery: number
    }
  ) {
    if (arr == null && struct == null) {
      throw Error(`Invalid constructor arguments.`)
    }

    if (arr == null) {
      super(Signature.SIZE)
    } else {
      super(arr.bytes, arr.offset, Signature.SIZE)
    }

    if (struct != null) {
      this.set(struct.signature, this.signatureOffset)
      this.set([struct.recovery], this.recoveryOffset)
    }
  }

  get signatureOffset(): number {
    return this.byteOffset
  }
  get signature() {
    return new Uint8Array(this.buffer, this.signatureOffset, SIGNATURE_LENGTH)
  }

  get recoveryOffset(): number {
    return this.byteOffset + SIGNATURE_LENGTH
  }

  get recovery(): number {
    return this[this.recoveryOffset]
  }

  get msgPrefix(): Uint8Array {
    return new Uint8Array()
  }

  get onChainSignature(): Uint8Array {
    return this.signature
  }

  static get SIZE(): number {
    return SIGNATURE_LENGTH + SIGNATURE_RECOVERY_LENGTH
  }

  static create(arr?: {
    bytes: ArrayBuffer
    offset: number
  }, struct?: {
      signature: Uint8Array
      recovery: number
    }) {
    return new Signature(arr, struct)
  }
}

export default Signature
