export default {
  name: 'users',
  type: 'document',
  title: 'Users',
  fields: [
    {
      name: 'login',
      type: 'string',
      title: 'Login',
    },
    {
      name: 'password',
      type: 'string',
      title: 'Password',
    },
  ],
}
