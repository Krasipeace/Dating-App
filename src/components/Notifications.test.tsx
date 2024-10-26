import { likeNotification, messageNotification } from './Notifications';
import { MessageDto } from '@/types';
import { toast } from 'react-toastify';


jest.mock('react-toastify', () => ({
    toast: jest.fn()
}));

describe('messageNotification', () => {
    const message: MessageDto = {
        senderImage: 'image.jpg',
        senderId: '123456',
        senderName: 'John Doe',
        id: '',
        text: 'test message',
        created: '',
        dateRead: null
    };

    it('calls toast with NotificationToast component', () => {
        messageNotification(message);

        expect(toast).toHaveBeenCalledTimes(1);
        expect(toast).toHaveBeenCalledWith(expect.anything());
    });
});

describe('likeNotification', () => {
    it('calls toast with NotificationToast component', () => {
        likeNotification('John Doe', 'image.jpg', '123456');

        expect(toast).toHaveBeenCalledTimes(2);
        expect(toast).toHaveBeenCalledWith(expect.anything());
    });
});