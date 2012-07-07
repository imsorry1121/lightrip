class SchedulesController < ApplicationController
  include RestGraph::RailsUtil
  before_filter :load_facebook, :only => [:postSchedule]    

 #before_filter :filter_setup_rest_graph, :only => [:postSchedule]
  # GET /schedules
  # GET /schedules.json
  def index
    @schedules = Schedule.all
    #@friends = rest_graph.get('/me/friends') #lead to error  deleted by Peter
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @schedules }
    end
  end

  # GET /schedules/1
  # GET /schedules/1.json
  def show
    @schedule = Schedule.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @schedule }
    end
  end

  # GET /schedules/new
  # GET /schedules/new.json
  def new
    @schedule = Schedule.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @schedule }
    end
  end
  # GET /schedules/1/edit
  def edit
    @schedule = Schedule.find(params[:id])
  end

  # POST /schedules
  # POST /schedules.json
  def create
    @schedule = Schedule.new(params[:schedule])

    respond_to do |format|
      if @schedule.save
        format.html { redirect_to @schedule, notice: 'Schedule was successfully created.' }
        format.json { render json: @schedule, status: :created, location: @schedule }
      else
        format.html { render action: "new" }
        format.json { render json: @schedule.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /schedules/1
  # PUT /schedules/1.json
  def update
    @schedule = Schedule.find(params[:id])

    respond_to do |format|
      if @schedule.update_attributes(params[:schedule])
        format.html { redirect_to @schedule, notice: 'Schedule was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @schedule.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /schedules/1
  # DELETE /schedules/1.json
  def destroy
    @schedule = Schedule.find(params[:id])
    @schedule.destroy

    respond_to do |format|
      format.html { redirect_to schedules_url }
      format.json { head :no_content }
    end
  end

  # POST /save
  # POST /save.json
  def save
    @schedule = Schedule.new()
    @schedule[:user] = params[:user]
    @schedule[:schedule_name] = params[:schedule_name]
    @schedule[:content] = params[:content]
    @schedule.save

    # respond_to do |format|
      # if @schedule.save
        # format.html { redirect_to @schedule, notice: 'Schedule was successfully created.' }
        # format.json { render json: @schedule, status: :created, location: @schedule }
      # else
        # format.html { render action: "new" }
        # format.json { render json: @schedule.errors, status: :unprocessable_entity }
      # end
    # end
     render json: @schedule
  end

   def save_rewrite
    @schedule = Schedule.where(:id => params[:sid])
    if @schedule[0] == nil  #Avoid saving a not existed schedule in DB

    else

      @schedule[0][:user] = params[:user]
      @schedule[0][:schedule_name] = params[:schedule_name]
      @schedule[0][:content] = params[:content]
      @schedule[0].save

    end

    

    # respond_to do |format|
      # if @schedule.save
        # format.html { redirect_to @schedule, notice: 'Schedule was successfully created.' }
        # format.json { render json: @schedule, status: :created, location: @schedule }
      # else
        # format.html { render action: "new" }
        # format.json { render json: @schedule.errors, status: :unprocessable_entity }
      # end
    # end
     render json: @schedule[0]
  end






  def show_user_schedule
    @schedule = Schedule.where(:user => params[:user])

    render json: @schedule
  end

def postSchedule
    unless rest_graph.access_token.nil?
      puts "=========================="
      message = params[:description]
      schedule_name = params[:title]
      sid = params[:sid]
      src = params[:src]
      puts src
      puts"=================================="
      website = '/'+sid
      #website = "http://localhost3000/"+sid
      rest_graph.post('/me/feed', :message => schedule_name, :name => "lightrip", :description => message, :picture => (('http://lightrip.herokuapp.com'+src)), :link => ('http://lightrip.herokuapp.com/'+sid))
        #:picture => "http://www.dnac.org/images/Paris_Effel.jpg", :name => "name", :caption => {}"caption", :description => "description", :link => "http://google.com/paris",:actions=>{"name": "View on Zombo", "link": "http://www.zombo.com"}) 
    end
       redirect_to home_path, :notice => 'Post successfully!'
  end


  def remove
     @schedule = Schedule.find(params[:sid])
     @schedule.destroy

     render json: @schedule

    # respond_to do |format|
    #   format.html { redirect_to schedules_url }
    #   format.json { head :no_content }
    # end

  end

end
