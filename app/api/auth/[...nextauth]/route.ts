import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { addUser, getUser } from "@/lib/script";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
    // 显示按钮文案 (e.g. "Sign in with...")
    name: "密码登录",
    // `credentials` 用于渲染登录页面表单
    credentials: {
      username: { label: "账号", type: "text", placeholder: "输入您的账号" },
      password: { label: "密码", type: "password", placeholder: "输入您的密码" }
    },
    // 处理从用户收到的认证信息
    async authorize(credentials, req) {
      // 默认情况下不对用户输入进行验证，确保使用 Zod 这样的库进行验证
      let user = null

      // 登陆信息验证
      user = await getUser(credentials.username, credentials.password)

      // 密码错误
      if (user === 1) return null

      // 用户注册
      if (user === 0) {
        user = await addUser(credentials.username, credentials.password)
      }

      if (!user) {
        throw new Error("User was not found and could not be created.")
      }

      return user
    }
  }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 登录时，将 userId 保存到 token
      if (user) {
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token }) {
      // 将 userId 添加到 session.user
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }