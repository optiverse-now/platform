export type BlogPost = {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'published';
}

export type BlogFormData = {
  title: string;
  content: string;
} 