export interface TreeNode {
  id: number;
  parentId: number | null;
  name: string;
  description: string;
  children?: TreeNode[];
  expandable: boolean;

}
