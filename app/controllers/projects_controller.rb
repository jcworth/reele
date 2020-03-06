class ProjectsController < ApplicationController
  before_action :find_project, only: [ :show, :edit, :update, :destroy ]
  skip_before_action :authenticate_user!, only: [:index, :show]

  def index
    @projects = Project.all
  end

  def show
    @comment = Comment.new
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    @project.user = current_user
    if @project.save
      redirect_to dashboard_path
    else
      render :new
    end

  end

  def edit; end

  def update
    @project.update(project_params)
    redirect_to project_path(@project)
  end

  def destroy
    @project.destroy
    redirect_to dashboard_path
  end

  private

  def project_params
    params.require(:project).permit(:title, :description, :media_type, :published, :audio_file)
  end

  def find_project
    @project = Project.find(params[:id])
  end
end
