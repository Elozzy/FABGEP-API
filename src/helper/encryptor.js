import bcrypt from 'bcryptjs';
import Cryptr from 'cryptr';
const salt = bcrypt.genSaltSync(10);
const cryptrKey = "$(88200819970317@CyberCopWithEndTOEndEncryptionModule)";
const cryptr = new Cryptr(cryptrKey);
/**
 * @description Encrypt data and compare
 */
class Encryptor {
    /**
     * @description Encryt user data passed as parameter
     * @param { Object } data 
     * @return { String } encryted data
     */
    static encrypt(data) {
        const encryted = bcrypt.hashSync(data, salt);
        return encryted;
    }

    static compare(compare, hash) {
        /**
         * @description
         * @param { compare } data to compare
         * @param { hash } data hash to compare with
         */
        const decrypted = bcrypt.compareSync(compare, hash);
        return decrypted;
    }

    static dataEncrypt(data) {
        return cryptr.encrypt(data);
    };
    static dataDecrypt(data) {
        return cryptr.decrypt(data);
    }
}

export default Encryptor;