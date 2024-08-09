import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import axios from "axios";


const agent = new (require('https')).Agent({
    rejectUnauthorized: false
  });

const POST = async (req: NextRequest) => {
    const { ProxmoxApiUrl, username, password } = await req.json();
    const cookieStore = cookies();
    console.log(cookieStore);

    const sessionCookie = cookieStore.get('session_cookie') || "";
    const updatedProxmoxApiURL = ProxmoxApiUrl.endsWith('/') ? ProxmoxApiUrl : `${ProxmoxApiUrl}/`;

    try {
        const res = await axios.post(`${updatedProxmoxApiURL}access/ticket`, `username=${username}&password=${password}` , {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            httpsAgent: agent,
        })
        console.log(res.data);
        const data = await res.data;
        if (data.data) {
            cookieStore.set("session_cookie", JSON.stringify({
                ticket: data.data.ticket,
                token: data.data.ticket,
                ProxmoxApiUrl: updatedProxmoxApiURL,
                username
            })), {
                httpOnly: true,
                path: '/'
            }
            console.log("cookie Store: ", cookieStore.get("session_cookie"));
            console.log("cookie Store: ", cookieStore.get("session-cookie"));
            return NextResponse.json({ authenticated: true, username });
        }
        else {
            return NextResponse.json({ authenticated: false }, {status: 401})
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.json({ authenticated: false });
    }
}

export {
    POST
}