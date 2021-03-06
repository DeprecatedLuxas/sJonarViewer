import {Router} from 'express';

const router = Router();


router.get("/", (req, res) => {
    res.json({
        knowns: [
            {
                name: "Mythic",
                sslImplementationTested: "python 3 w/aiohttp 3",
                jarmHash: "2ad2ad0002ad2ad00042d42d000000ad9bf51cc3f5a1e29eecb81d0c7b06eb",
                link: "https://github.com/its-a-feature/Mythic"
            },
            {
                name: "Metasploit ssl listener",
                sslImplementationTested: "ruby 2.7.0p0",
                jarmHash: "07d14d16d21d21d00042d43d000000aa99ce74e2c6d013c745aa52b5cc042d",
                link: "https://github.com/rapid7/metasploit-framework"
            },
            {
                name: "Metasplot ssl listener",
                sslImplementationTested: "ruby",
                jarmHash: "07d14d16d21d21d07c42d43d000000f50d155305214cf247147c43c0f1a823",
                link: "https://github.com/rapid7/metasploit-framework"
            },
            {
                name: "Cobalt Strike",
                sslImplementationTested: "Java 11",
                jarmHash: "07d14d16d21d21d07c42d41d00041d24a458a375eef0c576d23a7bab9a9fb1",
                link: "https://www.cobaltstrike.com/"
            },
            {
                name: "Merlin",
                sslImplementationTested: "go 1.15.2 linux/amd64",
                jarmHash: "29d21b20d29d29d21c41d21b21b41d494e0df9532e75299f15ba73156cee38",
                link: "https://github.com/Ne0nd0g/merlin"
            },
            {
                name: "Deimos",
                sslImplementationTested: "go 1.15.2 linux/amd64 with gorilla/websocket",
                jarmHash: "00000000000000000041d00000041d9535d5979f591ae8e547c5e5743e5b64",
                link: "https://github.com/DeimosC2/DeimosC2"
            },
            {
                name: "MacC2",
                sslImplementationTested: "python 3.8.6 w/aiohttp 3",
                jarmHash: "2ad2ad0002ad2ad22c42d42d000000faabb8fd156aa8b4d8a37853e1063261",
                link: "https://github.com/cedowens/MacC2"
            },
            {
                name: "MacC2",
                sslImplementationTested: "python 3.8.2 w/aiohttp 3",
                jarmHash: "2ad2ad0002ad2ad00042d42d000000ad9bf51cc3f5a1e29eecb81d0c7b06eb",
                link: "https://github.com/cedowens/MacC2"
            },
            {
                name: "MacShellSwift",
                sslImplementationTested: "python 3.8.6 socket",
                jarmHash: "2ad000000000000000000000000000eeebf944d0b023a00f510f06a29b4f46",
                link: "https://github.com/cedowens/MacShellSwift"
            },
            {
                name: "MacShell",
                sslImplementationTested: "python 3.8.6 socket",
                jarmHash: "2ad000000000000000000000000000eeebf944d0b023a00f510f06a29b4f46",
                link: "https://github.com/cedowens/MacShellSwift"
            },
            {
                name: "Silver",
                sslImplementationTested: "go 1.15.2 linux/amd64",
                jarmHash: "2ad2ad0002ad2ad00041d2ad2ad41da5207249a18099be84ef3c8811adc883",
                link: "https://github.com/BishopFox/sliver"
            },
            {
                name: "EvilGinx2",
                sslImplementationTested: "go 1.10.4 linux/amd64",
                jarmHash: "20d14d20d21d20d20c20d14d20d20daddf8a68a1444c74b6dbe09910a511e6",
                link: "https://github.com/kgretzky/evilginx2"
            }, {
                name: "Shado0w",
                sslImplementationTested: "python 3.8 flask",
                jarmHash: "2ad2ad0002ad2ad00042d42d000000ad9bf51cc3f5a1e29eecb81d0c7b06eb",
                link: "https://github.com/bats3c/shad0w"
            },
            {
                name: "Get2",
                sslImplementationTested: "N/A",
                jarmHash: "07d19d12d21d21d07c07d19d07d21da5a8ab90bcc6bf8bbc6fbec4bcaa8219",
                link: "N/A"
            },
            {
                name: "GRAT2 C2",
                sslImplementationTested: "python 3 http.server",
                jarmHash: "2ad2ad0002ad2ad00042d42d000000ad9bf51cc3f5a1e29eecb81d0c7b06eb",
                link: "https://github.com/r3nhat/GRAT2"
            },
            {
                name: "Covenant",
                sslImplementationTested: "ASP.net core",
                jarmHash: "21d14d00000000021c21d14d21d21d1ee8ae98bf3ef941e91529a93ac62b8b",
                link: "https://github.com/cobbr/Covenant"
            },
            {
                name: "SILENTRINITY",
                sslImplementationTested: "ironpython",
                jarmHash: "2ad2ad0002ad2ad00042d42d000000ad9bf51cc3f5a1e29eecb81d0c7b06eb",
                link: "https://github.com/byt3bl33d3r/SILENTTRINITY"
            },
            {
                name: "PoshC2",
                sslImplementationTested: "python 3 http.server",
                jarmHash: "2ad2ad0002ad2ad22c42d42d000000faabb8fd156aa8b4d8a37853e1063261",
                link: "https://github.com/nettitude/PoshC2"
            },
        ]

    }).status(200);
})


export default router;
