import { STORE_URL } from '~/constants';

export const loader = () => {

  // handle "GET" request
// separating xml content from Response to keep clean code. 
    const today = new Date();
    const content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
    <loc>`+ STORE_URL + `/</loc>
    <lastmod>` + today.toISOString() + `</lastmod>
    <priority>1.0</priority>
    </url>
    </urlset>
    `
    // Return the response with the content, a status 200 message, and the appropriate headers for an XML page
    return new Response(content,{
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "xml-version": "1.0",
        "encoding": "UTF-8"
      }
    });
};