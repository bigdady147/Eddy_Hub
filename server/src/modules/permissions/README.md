# Permission Module

Module quản lý phân quyền (permissions) cho users, cho phép kiểm soát quyền truy cập vào các features trong hệ thống.

## Cấu trúc

- **permission.model.ts**: Mongoose schema cho Permission
- **permission.interface.ts**: TypeScript interface cho Permission
- **permission.service.ts**: Business logic xử lý permissions
- **permission.controller.ts**: Controllers xử lý HTTP requests
- **permission.routes.ts**: API routes
- **index.ts**: Export barrel file

## Schema

```typescript
{
  user: ObjectId,          // Reference đến User
  feature: ObjectId,       // Reference đến Feature
  isActive: boolean,       // Trạng thái kích hoạt
  grantedBy: ObjectId,     // User đã cấp quyền (optional)
  createdAt: Date,         // Thời gian tạo
  updatedAt: Date          // Thời gian cập nhật
}
```

## API Endpoints

### Grant Permissions

#### Cấp quyền cho user

```
POST /api/permissions/grant
Body: {
  "userId": "user_id",
  "featureId": "feature_id",
  "grantedBy": "admin_user_id" (optional)
}
```

#### Cấp nhiều quyền cùng lúc

```
POST /api/permissions/grant-multiple
Body: {
  "userId": "user_id",
  "featureIds": ["feature_id_1", "feature_id_2"],
  "grantedBy": "admin_user_id" (optional)
}
```

### Revoke Permissions

#### Thu hồi quyền

```
POST /api/permissions/revoke
Body: {
  "userId": "user_id",
  "featureId": "feature_id"
}
```

#### Thu hồi tất cả quyền

```
POST /api/permissions/revoke-all
Body: {
  "userId": "user_id"
}
```

### Check Permissions

#### Kiểm tra user có quyền không

```
GET /api/permissions/check/:userId/:featureKey
```

### Query Permissions

#### Lấy danh sách feature IDs của user

```
GET /api/permissions/user/:userId
```

#### Lấy danh sách features đầy đủ của user

```
GET /api/permissions/user/:userId/features
```

#### Lấy tất cả permissions của user (bao gồm inactive)

```
GET /api/permissions/user/:userId/all
```

#### Lấy danh sách users có quyền truy cập feature

```
GET /api/permissions/feature/:featureId/users
```

#### Lấy chi tiết permission

```
GET /api/permissions/:userId/:featureId
```

### Delete Permissions

#### Xóa permission

```
DELETE /api/permissions/:userId/:featureId
```

**Lưu ý**: Nên sử dụng revoke thay vì delete để giữ lại lịch sử

### Statistics

#### Lấy thống kê permissions

```
GET /api/permissions/stats
```

Response:

```json
{
  "success": true,
  "data": {
    "totalPermissions": 100,
    "activePermissions": 85,
    "inactivePermissions": 15
  }
}
```

## Service Methods

### `grantPermission(userId, featureId, grantedBy?)`

Cấp quyền truy cập feature cho user. Nếu permission đã tồn tại, sẽ cập nhật thành active.

### `grantMultiplePermissions(userId, featureIds, grantedBy?)`

Cấp nhiều quyền cho user cùng lúc.

### `revokePermission(userId, featureId)`

Thu hồi quyền truy cập feature của user (set isActive = false).

### `revokeAllPermissions(userId)`

Thu hồi tất cả quyền của user.

### `hasPermission(userId, featureKey)`

Kiểm tra user có quyền truy cập feature không. Hỗ trợ cả featureKey và featureId.

### `getUserPermissions(userId)`

Lấy danh sách feature IDs mà user có quyền truy cập.

### `getUserFeatures(userId)`

Lấy danh sách đầy đủ các features mà user có quyền truy cập.

### `getUsersByFeature(featureId)`

Lấy danh sách users có quyền truy cập một feature cụ thể.

### `getAllUserPermissions(userId)`

Lấy tất cả permissions của user (bao gồm cả inactive).

### `getPermissionDetail(userId, featureId)`

Lấy chi tiết một permission cụ thể.

### `deletePermission(userId, featureId)`

Xóa hoàn toàn permission (không khuyến khích - nên dùng revoke).

### `deleteAllUserPermissions(userId)`

Xóa tất cả permissions của user (dùng khi xóa user).

### `getPermissionStats()`

Lấy thống kê về permissions trong hệ thống.

## Sử dụng

### Import service

```typescript
import { permissionService } from "@/modules/permissions";

// Cấp quyền
await permissionService.grantPermission(userId, featureId, adminId);

// Kiểm tra quyền
const hasAccess = await permissionService.hasPermission(userId, "analytics");

// Lấy features của user
const features = await permissionService.getUserFeatures(userId);
```

### Middleware kiểm tra quyền (Example)

```typescript
import { permissionService } from "@/modules/permissions";

export const checkPermission = (featureKey: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id; // Từ authentication middleware

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const hasPermission = await permissionService.hasPermission(
      userId,
      featureKey
    );

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền truy cập feature này",
      });
    }

    next();
  };
};

// Sử dụng
router.get(
  "/analytics",
  checkPermission("analytics"),
  analyticsController.getData
);
```

## Notes

- Permission sử dụng index unique trên `{ user, feature }` để tránh duplicate
- Khi grant permission, nếu đã tồn tại sẽ được cập nhật thành active
- Nên sử dụng `revoke` thay vì `delete` để giữ lại lịch sử phân quyền
- Method `hasPermission` hỗ trợ cả featureKey (string) và featureId (ObjectId)
- Tất cả queries đều có populate để lấy thông tin đầy đủ
