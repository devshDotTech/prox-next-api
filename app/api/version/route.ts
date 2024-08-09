import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import axios from "axios";
const agent = new (require('https')).Agent({
    rejectUnauthorized: false
});
const GET = async (req: NextRequest) => {
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
        const response = await axios.get(`${sessionValue.ProxmoxApiUrl}version`, {
            headers: {
                'CSRFPreventionToken': sessionValue.token,
                'Cookie': `PVEAuthCookie=${sessionValue.ticket}`
            },
            httpsAgent: agent
        });
        console.log(response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.log("error hai error", error)
        return NextResponse.json({ error: (error as Error) }, {status: 403});
    }
    // return NextResponse.json({ msg: "/version get hit", cookie: sessionCookie })

}

export {
    GET
}