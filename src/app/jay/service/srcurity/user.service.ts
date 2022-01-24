import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { UserDTO } from '../../model/base/user-dto';
import { ApiPagedData } from '../../model/common/api-paged-data';
import { ApiSimpleData } from '../../model/common/api-simple-data';
import { QueryOptions } from '../../model/common/query-options';
import { ChangePasswordInfoDTO } from '../../model/security/change-password-info-dto';
import { RoleDTO } from '../../model/security/role-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * API的入口URL
   */
  private static URL = '/api/authority/users';

  constructor(private http: _HttpClient) {}

  /**
   * 分页查询用户
   *
   * @param option 分页参数
   */
  getUsers(option: QueryOptions, name?: string): Observable<ApiPagedData<UserDTO>> {
    const params = {};
    Object.assign(params, option);
    Object.assign(params, name ? { name } : {});
    return this.http.get<ApiPagedData<UserDTO>>(UserService.URL, params);
  }

  /**
   * 新建用户
   *
   * @param createInfo 用户信息
   */
  createUser(createInfo: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(UserService.URL + '?encrypt=body', createInfo);
  }

  /**
   * 根据ID查找用户，用户包含基本资料，关联的员工资料，关联的工作岗位以及当前的用户设置
   *
   * @param userId 用户ID
   */
  findUserById(userId: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${UserService.URL}/${userId}`);
  }

  /**
   * 修改用户
   *
   * @param createInfo 用户信息
   * @param userId 用户id
   */
  updateUser(userId: string, updateInfo: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${UserService.URL}/${userId}?&encrypt=body`, updateInfo);
  }

  /**
   * 删除用户
   *
   * @param userId 用户id
   */
  deleteById(userId: string): Observable<any> {
    return this.http.delete(`${UserService.URL}/${userId}`);
  }

  /**
   * 根据用户ID查找用户所分配的角色
   *
   * @param userId 用户ID
   */
  findRolesByUserId(userId: string): Observable<Array<RoleDTO>> {
    return this.http.get<Array<RoleDTO>>(`${UserService.URL}/${userId}/roles`);
  }

  /**
   * 分配角色（重新设置用户的角色）
   *
   * @param id 用户ID
   * @param roles 角色ID数组
   */
  updateUserRoles(id: string, roles: ApiSimpleData<Array<string>>): Observable<any> {
    return this.http.put(`${UserService.URL}/${id}/roles`, roles);
  }

  /**
   * 解锁账号（因多次登录失败而被锁住账号)
   *
   * @param id 用户ID
   */
  unlockAccount(id: string): Observable<any> {
    return this.http.put(`${UserService.URL}/${id}/unlock`);
  }

  /**
   * 修改用户密码（只用于修改当前登录用户的密码）
   *
   * @param userId  用户ID
   * @param changePasswordInfoDTO 修改密码信息
   */
  updateUserPassword(userId: string, changePasswordInfoDTO: ChangePasswordInfoDTO): Observable<any> {
    return this.http.put(`${UserService.URL}/${userId}/password?encrypt=body`, changePasswordInfoDTO);
  }

  /**
   * 查询用户登录账号是否可用
   *
   * @param account 账号
   * @param id 用户ID, 新增用户时检查账号可用性可不填
   */
  findUserAvailability(account: string, id?: string): Observable<ApiPagedData<boolean>> {
    const params = { account };
    Object.assign(params, id ? { id } : {});

    return this.http.get<ApiPagedData<boolean>>(`${UserService.URL}/availability`, params);
  }

  /**
   * 切换当前登录用户所属组织
   *
   * @param organizaitonId 目标组织架构ID，通常为岗位
   */
  changeOrganazition(organizaitonId: string): Observable<Array<string>> {
    return this.http.put(`${UserService.URL}/working-organization/${organizaitonId}`);
  }

  /**
   * 查询全部用户
   * @param name 用户名
   */
  findAll(name?: string): Observable<Array<UserDTO>> {
    const params = {};
    Object.assign(params, name ? { name } : {});
    return this.http.get<Array<UserDTO>>(`${UserService.URL}/all`, params);
  }
}
