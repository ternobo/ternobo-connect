<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    @foreach ($posts as $post)
    <url>
        @if($post->type === "article")
        <loc>https://ternobo.com/articles/{{ $post->id }}</loc>
        @else
        <loc>https://ternobo.com/posts/{{ $post->id }}</loc>
        @endif
        <lastmod>{{ $post->updated_at->tz('UTC')->toAtomString() }}</lastmod>
        <changefreq>always</changefreq>
        <priority>1.0</priority>
    </url>
    @endforeach
    @foreach ($pages as $page)
    <url>
        <loc>https://ternobo.com/{{ $page->slug }}</loc>
        <lastmod>{{ $page->updated_at->tz('UTC')->toAtomString() }}</lastmod>
        <changefreq>always</changefreq>
        <priority>0.9</priority>
    </url>
    @endforeach

</urlset>