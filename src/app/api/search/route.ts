// frontend/app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const response = await fetch(`http://localhost:8000/search?query=${query}`);
  const data = await response.json();
  return NextResponse.json(data);
}
