import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

describe('Use case send notification', () => {
  it('should return a valid response with created notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationsRepository);

    await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notificationsRepository.notifications).toHaveLength(1);
  });
});
