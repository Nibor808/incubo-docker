export default (name, email, message) => {
  if (!name) return { error: "But... what should I call you?", type: "name" };
  if (!email) return { error: "How about an email?", type: "email" };
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return { error: "I don't think that one will work.", type: "email" };
  }
  if (!message)
    return {
      error: "Ok I'll guess. You want to talk about...",
      type: "message"
    };
};
