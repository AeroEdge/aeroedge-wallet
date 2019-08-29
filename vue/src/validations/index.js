export default {
  locale: 'ja',
  dictionary: {
    ja: {
      custom: {
        userId: {
          required: 'ユーザーIDを入力してください',
          min: '4文字以上で入力してください',
          max: '15文字以下で入力してください',
          regex: 'ユーザーIDに誤りがあります'
        },
        oldPassword: {
          checkPassword: '現在のパスワードが違います'
        },
        new_password: {
          min: '7文字以上で入力してください',
          max: '32文字以下で入力してください',
          regex: '英字、数字、記号のうち、二種類以上を組み合わせてください'
        },
        confirm_password: {
          min: '7文字以上で入力してください',
          max: '32文字以下で入力してください',
          regex: '英字、数字、記号のうち、二種類以上を組み合わせてください'
        },
        password: {
          min: '7文字以上で入力してください',
          max: '32文字以下で入力してください',
          regex: '英字、数字、記号のうち、二種類以上を組み合わせてください'
        },
        paymentCoinAmount: {
          required: '金額を入力してください'
        }
      }
    },
    en: {
      custom: {
        userId: {
          required: 'The user ID field is required',
          min: 'Please enter at least 4 character',
          max: 'Please enter a maximum of 15 characters',
          regex: 'The user ID is incorrect'
        },
        oldPassword: {
          checkPassword: 'The old password is incorrect'
        },
        new_password: {
          min: 'Please enter at least 7 character',
          max: 'Please enter a maximum of 32 characters',
          regex: ' Please combine two or more of letters, numbers, symbols'
        },
        confirm_password: {
          min: 'Please enter at least 7 character',
          max: 'Please enter a maximum of 32 characters',
          regex: ' Please combine two or more of letters, numbers, symbols'
        },
        password: {
          min: 'Please enter at least 7 character',
          max: 'Please enter a maximum of 32 characters',
          regex: ' Please combine two or more of letters, numbers, symbols'
        },
        paymentCoinAmount: {
          required: 'Please enter the amount'
        }
      }
    }
  }
}
