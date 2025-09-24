export const validateUsername = (username: string): string => {
  if (!username) {
    return 'กรุณากรอกชื่อผู้ใช้'
  } else if (username.length < 4 || username.length > 50) {
    return 'ชื่อผู้ใช้ต้องมี 4-50 ตัวอักษร'
  }
  return ''
}

export const validatePassword = (password: string): string => {
  if (!password) {
    return 'กรุณากรอกรหัสผ่าน'
  } else if (password.length < 6 || password.length > 50) {
    return 'รหัสผ่านต้องมี 6-50 ตัวอักษร'
  }
  return ''
}

export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) {
    return 'กรุณายืนยันรหัสผ่าน'
  } else if (confirmPassword !== password) {
    return 'รหัสผ่านไม่ตรงกัน'
  }
  return ''
}
