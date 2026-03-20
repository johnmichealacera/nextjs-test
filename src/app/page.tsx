import { PostForm } from "@/components/post-form";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  let dbError: string | null = null;

  try {
    posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  } catch {
    dbError =
      "Could not load posts. Check DATABASE_URL and run `npm run db:migrate`.";
  }

  return (
    <div className="min-h-full bg-muted/30">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-12 sm:px-6">
        <header className="space-y-2">
          <Badge variant="secondary" className="w-fit">
            Next.js · PostgreSQL · shadcn/ui
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Simple posts
          </h1>
          <p className="text-muted-foreground text-pretty">
            Server-rendered list with a server action form. Data lives in
            PostgreSQL via Prisma.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>New post</CardTitle>
            <CardDescription>
              Submits to a server action; the list below updates after save.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PostForm />
          </CardContent>
        </Card>

        <section className="space-y-4">
          <h2 className="text-lg font-medium">Recent posts</h2>
          {dbError ? (
            <p className="text-destructive text-sm">{dbError}</p>
          ) : posts.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No posts yet. Add one above.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {posts.map((post) => (
                <li key={post.id}>
                  <Card>
                    <CardHeader className="gap-1 py-4">
                      <CardTitle className="text-base">{post.title}</CardTitle>
                      <CardDescription>
                        {new Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(post.createdAt)}
                      </CardDescription>
                    </CardHeader>
                    {post.content ? (
                      <CardContent className="text-muted-foreground pt-0 text-sm">
                        {post.content}
                      </CardContent>
                    ) : null}
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
