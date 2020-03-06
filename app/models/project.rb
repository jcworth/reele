class Project < ApplicationRecord
  belongs_to :user
  has_many :project_categories
  has_one :category, through: :project_categories
  has_many :comments, dependent: :destroy
  has_one_attached :photo
  has_one_attached :video

  MEDIA_TYPE = ['audio', 'video']

  validates :title, :media_type, presence: true
end
