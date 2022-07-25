function sha256(plain) { 
        // returns promise ArrayBuffer
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }

    function base64urlencode(a) {
        // Convert the ArrayBuffer to string using Uint8 array.
        // btoa takes chars from 0-255 and base64 encodes.
        // Then convert the base64 encoded to base64url encoded.
        // (replace + with -, replace / with _, trim trailing =)
        return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    async function pkce_challenge_from_verifier(v) {
        hashed = await sha256(v);
        base64encoded = base64urlencode(hashed);
        return base64encoded;
    }
