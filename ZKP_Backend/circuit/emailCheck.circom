pragma circom 2.2.1;

template EmailVerification() {
    signal input emailHash;            // Hash of the user's email
    signal input n;
    signal input preApprovedHashes[1000]; // Array of pre-approved email hashes
    signal output isApproved;

    var temp = 0;
    var isEqual;

    for (var i = 0; i < n; i++) {
        isEqual = (emailHash == preApprovedHashes[i] ? 1 : 0);
        temp += isEqual;
    }

    isApproved <-- (temp > 0 ? 1 : 0);
}

component main = EmailVerification();