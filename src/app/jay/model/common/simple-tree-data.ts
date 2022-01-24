/**
 * 一般树结点
 */
export interface SimpleTreeData {
  /**
   * 对象ID，新增时应当为null
   */
  id?: string;

  /**
   * 名称
   */
  name?: string;

  /**
   * 是否为叶子节点
   */
  isLeaf?: boolean;

  /**
   * 级次，标识该结点在树结构中的层次，ROOT结点为1
   */
  treeLevel?: number;

  /**
   * 树结点路径，格式：父结点ID-自己的ID-
   */
  treePath?: string;

  /**
   * 显示顺序
   */
  showOrder?: number;

  /**
   * 类型，业务系统自行定义
   */
  type?: string;

  /**
   * 子节点
   */
  children?: Array<SimpleTreeData>;

  /**
   * 父节点
   */
  parent?: SimpleTreeData;

  /**
   * 关联数据
   */
  data?: any;
}
