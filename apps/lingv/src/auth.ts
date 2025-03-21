import NextAuth from "next-auth";
import ZitadelProvider from "next-auth/providers/zitadel";

// export const authOptions = {
//   // debug:true,
//   providers:[ZitadelProvider({
//       clientId: "309732585615982645",
//       clientSecret: "GucsvkOsgfbQlssEf7GgRph3rN70XwFWOyGzdgDg1A2EcHC0YMWXw70tqkBOJ1GZ",
//       issuer: "https://id.jobico.local",
//       authorization: {
//         params: {
//           scope: "openid profile email"
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async session({ session/*, token*/ }){
//       session.user.image="";
//       return session;
//     },
//     // async jwt({ token, user, account }) {
//     //   console.log(token.idToken);
//     //   console.log(account);
//     //   console.log(user);
//     //   return token
//     // },

//   },
// };

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers:[ZitadelProvider({
      clientId: "309732585615982645",
      clientSecret: "GucsvkOsgfbQlssEf7GgRph3rN70XwFWOyGzdgDg1A2EcHC0YMWXw70tqkBOJ1GZ",
      issuer: "https://id.jobico.local",
      authorization: {
        params: {
          scope: "openid profile email"
        }
      }
    })
  ]
});
//[...nextauth]