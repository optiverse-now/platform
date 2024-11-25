import { ActionButton } from '@/app/components/atoms/buttons/ActionButton'
import { TableCell, TableRow } from "@/app/components/ui/table"
import { Trash2, Pencil } from 'lucide-react'
import { BlogTableRowProps } from './types'
import { 
  AlertDialog, 
  AlertDialogTrigger, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogCancel, 
  AlertDialogAction 
} from '@/app/components/ui/alert-dialog'

export function BlogTableRow({ post, onEdit, onDelete }: BlogTableRowProps) {
  return (
    <TableRow>
      <TableCell>{post.title}</TableCell>
      <TableCell>{post.status}</TableCell>
      <TableCell className="text-right">
        <ActionButton
          variant="outline"
          size="sm"
          className="mr-2"
          onClick={() => onEdit(post.id)}
        >
          <Pencil className="w-4 h-4" />
          編集
        </ActionButton>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <ActionButton
              variant="outline"
              size="sm"
              onClick={() => onDelete(post.id)}
            >
              <Trash2 className="w-4 h-4" />
            </ActionButton>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>記事を削除しますか？</AlertDialogTitle>
              <AlertDialogDescription>
                この操作は取り消せません。記事「{post.title}」を削除してもよろしいですか？
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>キャンセル</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(post.id)}>
                削除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
} 