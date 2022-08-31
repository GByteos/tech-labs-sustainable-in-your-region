export default async function logout(_, ctx) {
  return await ctx.session.$revoke()
}
