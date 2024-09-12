module.exports = {
    compactDecrypt: require('./jwe/compact/decrypt.js').compactDecrypt,
    flattenedDecrypt: require('./jwe/flattened/decrypt.js').flattenedDecrypt,
    generalDecrypt: require('./jwe/general/decrypt.js').generalDecrypt,
    compactVerify: require('./jws/compact/verify.js').compactVerify,
    flattenedVerify: require('./jws/flattened/verify.js').flattenedVerify,
    generalVerify: require('./jws/general/verify.js').generalVerify,
    jwtVerify: require('./jwt/verify.js').jwtVerify,
    jwtDecrypt: require('./jwt/decrypt.js').jwtDecrypt,
    CompactEncrypt: require('./jwe/compact/encrypt.js').CompactEncrypt,
    FlattenedEncrypt: require('./jwe/flattened/encrypt.js').FlattenedEncrypt,
    CompactSign: require('./jws/compact/sign.js').CompactSign,
    FlattenedSign: require('./jws/flattened/sign.js').FlattenedSign,
    GeneralSign: require('./jws/general/sign.js').GeneralSign,
    SignJWT: require('./jwt/sign.js').SignJWT,
    EncryptJWT: require('./jwt/encrypt.js').EncryptJWT,
    calculateJwkThumbprint: require('./jwk/thumbprint.js').calculateJwkThumbprint,
    EmbeddedJWK: require('./jwk/embedded.js').EmbeddedJWK,
    createRemoteJWKSet: require('./jwks/remote.js').createRemoteJWKSet,
    UnsecuredJWT: require('./jwt/unsecured.js').UnsecuredJWT,
    exportPKCS8: require('./key/export.js').exportPKCS8,
    exportSPKI: require('./key/export.js').exportSPKI,
    exportJWK: require('./key/export.js').exportJWK,
    importSPKI: require('./key/import.js').importSPKI,
    importPKCS8: require('./key/import.js').importPKCS8,
    importX509: require('./key/import.js').importX509,
    importJWK: require('./key/import.js').importJWK,
    decodeProtectedHeader: require('./util/decode_protected_header.js').decodeProtectedHeader,
    errors: require('./util/errors.js'),
    generateKeyPair: require('./key/generate_key_pair.js').generateKeyPair,
    generateSecret: require('./key/generate_secret.js').generateSecret,
    base64url: require('./util/base64url.js'),
}