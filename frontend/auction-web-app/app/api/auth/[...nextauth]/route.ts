import NextAuth, {  NextAuthOptions } from "next-auth";
import DuendeIdentityServer6 from "next-auth/providers/duende-identity-server6";
import { custom } from 'openid-client';

custom.setHttpOptionsDefaults({
    timeout: 10000, // Increase timeout to 5000ms
});

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        DuendeIdentityServer6({
            id: 'id-server',
            clientId: 'nextApp',
            clientSecret: "secret",
            issuer: 'http://localhost:5000',
            authorization: {params: {scope: 'openid profile auctionApp'}},
            idToken: true
        })
    ],
    callbacks: {
        async jwt({token, profile, account, user}){
            if(profile) {
                token.username = profile.username
                console.log(token.username);
            }
            if (account) {
                token.access_token = account.access_token
            }
            //console.log({token, profile, account, user});
            return token;
        },
        async session({session , token}) {
            if(token) {
                session.user.username = token.username
                //console.log(session.user.username);
            }else {
                console.log('Token not found');
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};