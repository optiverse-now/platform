import { BlogPost } from "@/app/types/blog"

export type BlogTableRowProps = {
  post: BlogPost;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}