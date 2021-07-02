import React, { Fragment, Suspense, useCallback, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';

import { Category, useCategoriesByType } from '@app/api/categories';
import { CategoryType } from '@app/api/common';
import { FirestoreStatus } from '@app/hooks/useFirestoreQuery';
import { CategoryPanel } from '@app/modules/category';
import {
  FillButton,
  DialogDelete,
  DialogOverlay,
  OutlinedButton,
  Title,
} from '@app/modules/common';
import { SubCategoryPanel } from '@app/modules/sub-category';

const styles = {
  subcategories: 'md:col-span-2 bg-gray-200',
  wrapper: 'grid md:grid-cols-3 h-full',
};
const LazyForm = React.lazy(() => import('@app/modules/category/containers/form'));
const CategoriesPage: React.FC = () => {
  // States
  const [selectedCategoryType, setSelectedCategoryType] = useState<CategoryType>(
    CategoryType.Expense,
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  // Firestore
  const { data: categories, status } = useCategoriesByType(selectedCategoryType);

  // Handlers
  const onCategoryTypeSelected = useCallback((categoryType: CategoryType) => {
    setSelectedCategoryType(categoryType);
    setSelectedCategory(undefined);
  }, []);

  // Effects
  useEffect(() => {
    if (categories && categories.length && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  console.log('CategoriesPage rendering...');

  return (
    <div className={styles.wrapper}>
      <CategoryPanel
        categories={categories || []}
        categorySelected={selectedCategory}
        categoryTypeSelected={selectedCategoryType}
        isLoading={status === FirestoreStatus.LOADING}
        onCategorySelected={setSelectedCategory}
        onCategoryTypeSelected={onCategoryTypeSelected}
        onCreate={() => setIsOpenForm(true)}
      />
      <SubCategoryPanel
        category={selectedCategory}
        className={styles.subcategories}
        isLoading={status === FirestoreStatus.LOADING}
        onCategoryEdit={() => console.log('Creating')}
        onCreate={() => setIsOpen(true)}
        onDelete={() => console.log('Deleting')}
        onEdit={() => console.log('Editing')}
        subCategories={[]}
      />

      <Transition as={Fragment} show={isOpenForm}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => setIsOpenForm(false)}
          open={isOpenForm}
        >
          <div className="flex items-center justify-center min-h-screen">
            <DialogOverlay />
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-70"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-70"
            >
              <div className="bg-white rounded mx-1 md:mx-auto z-20 relative w-full xs:w-xs sm:w-sm md:w-md">
                <Dialog.Title
                  as={Title}
                  className="border-b text-blueGray-600 px-8 py-5 relative"
                  tag="h5"
                >
                  Crear Categoria
                  <a className="absolute right-10" href="#" onClick={() => setIsOpenForm(false)}>
                    <FontAwesomeIcon icon="times" />
                  </a>
                </Dialog.Title>
                <Dialog.Description as="div" className="p-5">
                  <Suspense fallback={<p>Loading...</p>}>
                    <LazyForm />
                  </Suspense>
                </Dialog.Description>
                <div className="px-8 py-5 border-t flex justify-end gap-2">
                  <OutlinedButton onClick={() => setIsOpenForm(false)}>
                    <FontAwesomeIcon className="mr-1" icon="times-circle" fixedWidth />
                    Cancelar
                  </OutlinedButton>
                  <FillButton>
                    <FontAwesomeIcon className="mr-1" icon="save" fixedWidth />
                    Guardar
                  </FillButton>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <DialogDelete
        action={() => setIsOpen(false)}
        isOpen={isOpen}
        message="Si elimina la categoria no puede volver atras."
        title="Estas Seguro?"
        toggle={setIsOpen}
      />
    </div>
  );
};

export default CategoriesPage;
