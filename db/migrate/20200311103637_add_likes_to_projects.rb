class AddLikesToProjects < ActiveRecord::Migration[6.0]
  def change
    add_column :projects, :likes, :integer, default: 0
  end
end
