import Sortable from 'sortablejs';


const initSortable = () => {
  const dashboard = document.querySelector('.dash-projects');
  if (dashboard) {
    Sortable.create(dashboard, {
      handle: '.dash-card',
      animation: 150,
    });
  }
};

export { initSortable };
