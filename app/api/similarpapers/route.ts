// app/api/exasearch/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Exa from "exa-js";

export const maxDuration = 60;

const exa = new Exa(process.env.EXA_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: 'search query is required' }, { status: 400 });
    }

    // Use Exa to search for research papers
    const result = await exa.findSimilarAndContents(
        query,
        {
          numResults: 10,
          text: true,
          summary: {
            query: `Give me a one line summary about this research paper in simple english, use simple words. Don't start with "this research paper is about...", get straight to the point.`
          },
        }
    );


    return NextResponse.json({ results: result.results });
  } catch (error) {
    return NextResponse.json({ error: `Failed to perform search | ${error}` }, { status: 500 });
  }
}