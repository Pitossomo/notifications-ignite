import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@test/notification-factory.ts/make-notification';

describe('Use case count notification', () => {
  it('should return the correct number of notifications for one user', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countNotification = new CountRecipientNotifications(
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

    const { count } = await countNotification.execute({
      recipientId: 'recipient1',
    });

    expect(count).toEqual(2);
  });
});
