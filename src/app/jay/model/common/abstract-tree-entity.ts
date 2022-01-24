import { AbstractBaseEntity } from './abstract-base-entity';

/**
 * 具有树结构的实体数据
 */
export interface AbstractTreeEntity<T> extends AbstractBaseEntity {
  /**
   * 结点的路径, 格式：父结点ID-本身结点ID-
   */
  treePath?: string;

  /**
   * 结点的层级，最顶级结点为1
   */
  treeLevel?: number;

  /**
   * 父结点
   */
  parent?: T;

  /**
   * 子结点
   */
  children?: T[];

  /**
   * 显示顺序
   */
  showOrder?: number;
}
