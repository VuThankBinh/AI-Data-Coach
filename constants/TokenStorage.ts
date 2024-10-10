// tokenStorage.ts
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'your-secret-key'; // Thay thế bằng khóa bí mật của bạn
const TOKEN_KEY = 'app_token';

// Interface để định nghĩa các phương thức storage
interface IStorageProvider {
    setItem(key: string, value: string): Promise<void>;
    getItem(key: string): Promise<string | null>;
    removeItem(key: string): Promise<void>;
}

// Storage Provider cho Web
class WebStorageProvider implements IStorageProvider {
    async setItem(key: string, value: string): Promise<void> {
        localStorage.setItem(key, value);
    }

    async getItem(key: string): Promise<string | null> {
        return localStorage.getItem(key);
    }

    async removeItem(key: string): Promise<void> {
        localStorage.removeItem(key);
    }
}

// Storage Provider cho React Native
class RNStorageProvider implements IStorageProvider {
    private AsyncStorage: any;

    constructor() {
        // Dynamic import để tránh lỗi khi chạy trên web
        import('@react-native-async-storage/async-storage').then(
            module => this.AsyncStorage = module.default
        );
    }

    async setItem(key: string, value: string): Promise<void> {
        await this.AsyncStorage.setItem(key, value);
    }

    async getItem(key: string): Promise<string | null> {
        return await this.AsyncStorage.getItem(key);
    }

    async removeItem(key: string): Promise<void> {
        await this.AsyncStorage.removeItem(key);
    }
}

class TokenStorage {
    private storageProvider: IStorageProvider;

    constructor() {
        // Kiểm tra môi trường và chọn provider phù hợp
        if (typeof window !== 'undefined' && window.localStorage) {
            this.storageProvider = new WebStorageProvider();
        } else {
            this.storageProvider = new RNStorageProvider();
        }
    }

    private encryptToken(token: string): string {
        return CryptoJS.AES.encrypt(token, ENCRYPTION_KEY).toString();
    }

    private decryptToken(encryptedToken: string): string {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    async saveToken(token: string): Promise<boolean> {
        try {
            const encryptedToken = this.encryptToken(token);
            await this.storageProvider.setItem(TOKEN_KEY, encryptedToken);
            return true;
        } catch (error) {
            console.error('Error saving token:', error);
            return false;
        }
    }

    async getToken(): Promise<string | null> {
        try {
            const encryptedToken = await this.storageProvider.getItem(TOKEN_KEY);
            if (encryptedToken) {
                return this.decryptToken(encryptedToken);
            }
            return null;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    }

    async removeToken(): Promise<boolean> {
        try {
            await this.storageProvider.removeItem(TOKEN_KEY);
            return true;
        } catch (error) {
            console.error('Error removing token:', error);
            return false;
        }
    }

    async hasToken(): Promise<boolean> {
        try {
            const token = await this.storageProvider.getItem(TOKEN_KEY);
            return token !== null;
        } catch (error) {
            console.error('Error checking token:', error);
            return false;
        }
    }
}

// Xuất instance singleton
export default new TokenStorage();