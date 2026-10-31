export function upcomingSessions(count = 3) {
  const sessions = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (sessions.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() === 4 || cursor.getDay() === 6) {
      sessions.push(new Date(cursor));
    }
  }
  return sessions;
}