class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
    @user = current_user
    if params[:query].present?
      @project_list = Project.where(published: true, category: params[:query])
    else
      @project_list = Project.where(published: true)
    end
  end

  def dashboard
    @user = current_user
  end
end

