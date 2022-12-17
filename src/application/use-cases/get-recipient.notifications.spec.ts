import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';
import { makeNotification } from '@test/notification-factory.ts/make-notification';

describe('Use case get notification', () => {
  it('should return the correct number of notifications for one user', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countNotification = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient2' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient1' }),
    );

    const { notifications } = await countNotification.execute({
      recipientId: 'recipient1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient1' }),
        expect.objectContaining({ recipientId: 'recipient1' }),
      ]),
    );
  });
});
