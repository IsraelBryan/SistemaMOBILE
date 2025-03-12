const vrchat = require("vrchat");
const readline = require("readline")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));


const configuration = new vrchat.Configuration({
    username: "UMBFB",
    password: "umbreon_game23",
    baseOptions: {
        headers: { "User-Agent": "umbfb9014@gmail.com"}
    }
});

const authenticationApi = new vrchat.AuthenticationApi(configuration);
const usersApi = new vrchat.UsersApi(configuration);
const systemApi = new vrchat.SystemApi(configuration);

async function main() {
    var currentUser = (await authenticationApi.getCurrentUser()).data;

    if (currentUser["requiresTwoFactorAuth"] && currentUser["requiresTwoFactorAuth"][0] === "emailOtp") {
        await authenticationApi.verify2FAEmailCode({ code: await prompt("email Code\n") })
        currentUser = (await authenticationApi.getCurrentUser()).data;
    }
    if (currentUser["requiresTwoFactorAuth"] && currentUser["requiresTwoFactorAuth"][0] === "totp") {
        await authenticationApi.verify2FA({ code: await prompt("2fa Code\n") })
        currentUser = (await authenticationApi.getCurrentUser()).data;
    }

    console.log(`Conta logada: ${currentUser.displayName}`);

    const currentOnlineUsers = (await systemApi.getCurrentOnlineUsers()).data;
    console.log(`Usuarios online: ${currentOnlineUsers.length}`);

    const tupperUser = (await usersApi.getUser(currentUser.id)).data;
    console.log(tupperUser.displayName);
    const avatar = (await currentUser.currentAvatar()).data;
    console.log(avatar);
    const avatarIMG = (await currentUser.currentAvatarImageUrl).data;
    console.log(avatarIMG);
    const online = (await currentUser.activeFriends()).data;
    console.log(online);
    const friends = (await currentUser.friends()).data;
    console.log(friends);
    const offline = (await currentUser.offlineFriends()).data;
    console.log(offline);
    const groups = (await currentUser.groups()).data;
    console.log(groups);
    const worlds = (await currentUser.worlds()).data;
    console.log(worlds);


}

main();