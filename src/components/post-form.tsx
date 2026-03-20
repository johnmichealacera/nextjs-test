import { createPost } from "@/app/actions/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PostForm() {
  return (
    <form action={createPost} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Note title"
          required
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content (optional)</Label>
        <Input
          id="content"
          name="content"
          placeholder="Optional details"
          autoComplete="off"
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        Add post
      </Button>
    </form>
  );
}
