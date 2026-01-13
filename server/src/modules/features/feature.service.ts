import { Feature } from './feature.model';
import { IFeature } from './feature.interface';

export class FeatureService {
    async createFeature(data: Partial<IFeature>): Promise<IFeature> {
        const feature = await Feature.create(data);
        return feature;
    }

    async getAllFeatures(): Promise<IFeature[]> {
        return await Feature.find({ isActive: true });
    }

    async getFeatureByKey(key: string): Promise<IFeature | null> {
        return await Feature.findOne({ key });
    }

    async seedFeatures(): Promise<void> {
        const defaultFeatures = [
            { 
                name: { vi: 'Quản lý chi tiêu', en: 'Expense Manager' },
                key: 'expense_manager', 
                description: { 
                    vi: 'Theo dõi thu chi cá nhân, giao dịch, qua và trực quan.', 
                    en: 'Track personal income and expenses with visual insights.' 
                },
                icon: '💰'
            },
            { 
                name: { vi: 'Address Converter', en: 'Address Converter' },
                key: 'address_converter', 
                description: { 
                    vi: 'Chuyển đổi các địa chỉ từ và sang địa chỉ dạng khác.', 
                    en: 'Convert addresses between different formats.' 
                },
                icon: '📍'
            },
            { 
                name: { vi: 'File converter (Word to PDF)', en: 'File converter (Word to PDF)' },
                key: 'word_to_pdf', 
                description: { 
                    vi: 'Chuyển đổi file văn bản docx sang định dạng PDF chất lượng cao.', 
                    en: 'Convert Word documents to high-quality PDF format.' 
                },
                icon: '📄'
            },
            { 
                name: { vi: 'File converter (PDF to Word)', en: 'File converter (PDF to Word)' },
                key: 'pdf_to_word', 
                description: { 
                    vi: 'Chuyển đổi file PDF sang định dạng Word để dễ dàng chỉnh sửa.', 
                    en: 'Convert PDF files to editable Word format.' 
                },
                icon: '📝'
            },
            { 
                name: { vi: 'Keyboard tester', en: 'Keyboard tester' },
                key: 'keyboard_tester', 
                description: { 
                    vi: 'Kiểm tra độ nhạy và tính năng của các phím trên bàn phím của bạn.', 
                    en: 'Test keyboard responsiveness and key functionality.' 
                },
                icon: '⌨️'
            },
            { 
                name: { vi: 'Controller tester', en: 'Controller tester' },
                key: 'controller_tester', 
                description: { 
                    vi: 'Kiểm tra tay cầm chơi game (Gamepad/Controller) trực tuyến.', 
                    en: 'Test game controllers and gamepads online.' 
                },
                icon: '🎮'
            },
            { 
                name: { vi: 'JSON Parse', en: 'JSON Parse' },
                key: 'json_parse', 
                description: { 
                    vi: 'Định dạng và phân tích cú pháp JSON giúp lập trình viên dễ đọc code.', 
                    en: 'Format and parse JSON for better code readability.' 
                },
                icon: '🔧'
            },
        ];

        for (const featureData of defaultFeatures) {
            const exists = await Feature.findOne({ key: featureData.key });
            if (!exists) {
                await Feature.create(featureData);
            }
        }
    }
}

export const featureService = new FeatureService();
