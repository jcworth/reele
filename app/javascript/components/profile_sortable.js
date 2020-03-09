import Sortable, { Swap } from 'sortablejs';

const profileSortable = () => {
  const projects = document.getElementById('projects-cards');
  if (projects) {
    Sortable.create(projects, {
      handle: '.project-card',
      animation: 250,
      swap: true,
      put: true,
      // onDrop: function (evt) {
      //   evt.oldIndex;  // element index within parent
      // },
      group: 'projects',
      store: {
        get: function (sortable) {
          var order = localStorage.getItem(sortable.options.group.name);
          return order ? order.split('|') : [];
        },

        set: function (sortable) {
          var order = sortable.toArray();
          localStorage.setItem(sortable.options.group.name, order.join('|'));
        }
    }
  });
  };
};

const featuredSortable = ( ) => {
  const featured = document.getElementById('featured-project');
  if (featured) {
    Sortable.create(featured, {
      handle: 'user-featured-project-card',
      animation: 150,
      swap: true,
      sort: false,
      put: true,
      group: 'projects',
      store: {
        get: function (sortable) {
          var order = localStorage.getItem(sortable.options.group.name);
          return order ? order.split('|') : [];
        },

        set: function (sortable) {
          var order = sortable.toArray();
          localStorage.setItem(sortable.options.group.name, order.join('|'));
        }
    }
    });
  };
};

export { profileSortable, featuredSortable };

