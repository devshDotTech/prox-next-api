import { NextRequest, NextResponse } from "next/server"
// import { useRouter } from 'next/router'
import { cookies, headers } from "next/headers"
import axios from "axios";
const agent = new (require('https')).Agent({
    rejectUnauthorized: false
});
const GET = async (req: NextRequest, {params}: {params: { node: string}}) => {
    // const router = useRouter();

    const node = params.node
    console.log(node);
    // return NextResponse.json({msg: node})
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get("session_cookie")?.value || "";
    const sessionValue = JSON.parse(sessionCookie);
    if (!sessionValue.ticket || !sessionValue.ProxmoxApiUrl) {
        console.log("Session not found");
        return NextResponse.json({ error: 'Unauthorized' }, {
            status: 401
        });
    }

    try {
        const response = await axios.get(`${sessionValue.ProxmoxApiUrl}nodes/${node}/qemu/100/vncproxy`, {
            headers: {
                'CSRFPreventionToken': sessionValue.token,
                'Cookie': `PVEAuthCookie=${sessionValue.ticket}`
            },
            httpsAgent: agent
        });
        console.log(response.data.data);
        return NextResponse.json(response.data.data);
    } catch (error) {
        console.log("error hai error", error)
        return NextResponse.json({ error: (error as Error) }, {status: 403});
    }
    // return NextResponse.json({ msg: "/version get hit", cookie: sessionCookie })

}

export {
    GET
}