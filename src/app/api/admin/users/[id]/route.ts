import { NextResponse, NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { getMongoClient } from '@/lib/mongo';
import { ObjectId } from 'mongodb';

function getTokenFromReq(req: Request) {
	return req.headers.get('cookie')?.split('sn_token=')[1]?.split(';')[0] || null;
}

export async function GET(req: NextRequest, ctx: any): Promise<Response> {
	try {
	const token = getTokenFromReq(req);
	const payload = token ? verifyToken(token) as { email?: string; role?: string } : null;
		if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const client = await getMongoClient();
		const users = client.db('saral').collection('users');
	const id = ctx?.params?.id;
	if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
	let oid: ObjectId;
	try { oid = new ObjectId(id); } catch { return NextResponse.json({ error: 'Invalid id' }, { status: 400 }); }
	const u = await users.findOne({ _id: oid });
		if (!u) return NextResponse.json({ error: 'Not found' }, { status: 404 });
		if (u.password) delete u.password;
		return NextResponse.json({ user: u });
		} catch (_err) {
			return NextResponse.json({ error: String(_err) }, { status: 500 });
		}
}

export async function DELETE(req: NextRequest, ctx: any): Promise<Response> {
	try {
	const token = getTokenFromReq(req);
	const payload = token ? verifyToken(token) as { email?: string; role?: string } : null;
		if (!payload || payload.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const client = await getMongoClient();
		const users = client.db('saral').collection('users');
	const id = ctx?.params?.id;
	if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
	let oid: ObjectId;
	try { oid = new ObjectId(id); } catch { return NextResponse.json({ error: 'Invalid id' }, { status: 400 }); }
	const res = await users.deleteOne({ _id: oid });
		if (!res.deletedCount) return NextResponse.json({ error: 'Not found' }, { status: 404 });
		return NextResponse.json({ ok: true });
		} catch (_err) {
			return NextResponse.json({ error: String(_err) }, { status: 500 });
		}
}

