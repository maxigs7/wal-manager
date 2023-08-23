const translations = {
  headers: {
    currency: 'Currency',
    initialAmount: 'Initial Amount',
    isPrimary: 'Primary',
    name: 'Name',
    quotationId: 'Quotation',
    type: 'Type',
  },
  form: {
    currency: 'Currency',
    initialAmount: 'Initial Amount',
    initialAmountPlaceholder: 'Enter initial amount',
    isPrimary: 'Is it your primary account',
    name: 'Name',
    namePlaceholder: 'Enter account name',
    quotationId: 'Quotation',
    type: 'Type',
  },
  pages: {
    create: {
      metaTitle: 'New Account',
      title: 'New Account',
    },
    index: {
      metaTitle: 'My Accounts',
      title: 'My Accounts',
    },
    remove: {
      title: 'Remove Account',
      warning: {
        first: 'Are you sure you want to remove the account',
        last: '? This action cannot be undone.',
      },
    },
    update: {
      metaTitle: 'Edit Account',
      title: 'Edit Account',
    },
    noAccount: {
      title: 'You have no accounts',
      button: 'Configure accounts',
    },
  },
  toast: {
    createSuccess: 'Account created successfully.',
    removeSuccess: 'Account removed successfully.',
    uniqueError: 'An account with that name already exists.',
    updateSuccess: 'Account updated successfully.',
  },
};

export default translations;
