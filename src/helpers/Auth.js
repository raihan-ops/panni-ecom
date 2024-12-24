import CredentialsProvider from "next-auth/providers/credentials";
import {ENV_DEV} from "@/helpers/utils";

export const authConfig = {
    providers: [
        CredentialsProvider({
            id: "credentials_sign_id",
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {

                console.log("credentials", credentials)

                if (!credentials || !credentials.email || !credentials.password) {
                    return null;
                }

                return {
                    name: "Name",
                    image: "",
                    email: "abc@mail.com",
                    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                };
            },
        }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_CLIENT_ID,
        //     clientSecret: process.env.GITHUB_CLIENT_SECRET,
        // }),,
    ],
    callbacks: {
        async jwt({token, user, trigger, session}) {

            if (trigger === "update") {
                return {...token, ...session.user};
            }

            // return {...token, test: "Refreshed", ...user};

            return {...token, ...user};
        },
        async session({session, token, newSession}) {

            session.user = token;

            return session;
        },
    },
    session: {
        strategy: "jwt"
    },
    debug: process.env.PROFILE === ENV_DEV
};