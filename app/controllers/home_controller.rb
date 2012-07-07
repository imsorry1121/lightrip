class HomeController < ApplicationController
  include RestGraph::RailsUtil
  before_filter :login_facebook, :only => [:login]
  before_filter :load_facebook, :except => [:login]
  before_filter :filter_setup_rest_graph
  before_filter :filter_cache, :only => [:cache]
  
  def info

  end

  def lightrip
  end

  def logout
    reset_session
    redirect_to home_path
  end
  
  def index
    @access_token = rest_graph.access_token

    if @access_token
      @me = rest_graph.get('/me')
    end
    if (params[:sid].to_i>0)
      counter = params[:sid].to_i
       # if (Schedule.where(:id =>counter)) 
        @schedule_open = Schedule.where(:id =>counter)
      #
      if @schedule_open[0] == nil
        puts "CAN NOT be found!!!!!!!!!!!!!!!!!!!!!!!!!!"
        @reload = false
        # render index 

      else # record can be found
      
      @schedulereload = @schedule_open[0].content
      puts("==================================")
      puts(params[:sid])
      @schedulereload = @schedulereload.gsub("\"","asdfdsa")
      puts(@schedulereload)
      @reload= true 
      end
    else
    @reload = false
    @schedulereload = nil   
    
    end 
      #params[:reload]  
      #@schedule = params[:schedule]
      #@reload = params[:reload]  
    #end
    @spots=Spot.all
  

  end
  

  def attr
    respond_to do |format|
      format.html # show.html.erb
     # format.json { render json: @spot }
    end
  end

  def smart
    respond_to do |format|
      format.html # show.html.erb
     # format.json { render json: @spot }
    end
  end

  def step3
    # we will use params in the future  EX. params['attr1']

    #respond_to do |format|
    #    format.html # show.html.erb
    #    format.json { render json: @spot }
    #  end
    #end
    
     @spots = Spot.where(:city => params['city'])
     puts "--------------------------------------------------------------"
     puts params['city']
    #@spots = Spot.find(2)
    temp_hash = {}
    count = 0

      @spots.each{|hashelement|
        
         hashelement['attr1'] = hashelement['attr1'] * params['attr1'].to_i
         hashelement['attr2'] = hashelement['attr2'] * params['attr2'].to_i
         hashelement['attr3'] = hashelement['attr3'] * params['attr3'].to_i
         hashelement['attr4'] = hashelement['attr4'] * params['attr4'].to_i
         hashelement['attr5'] = hashelement['attr5'] * params['attr5'].to_i
         puts hashelement['attr1']
         puts hashelement['attr2']
         puts hashelement['attr3']
         puts hashelement['attr4']
         puts hashelement['attr5']

         hashelement['attr1'] += hashelement['attr2']
         hashelement['attr1'] += hashelement['attr3']
         hashelement['attr1'] += hashelement['attr4']
         hashelement['attr1'] += hashelement['attr5']
         value= hashelement['attr1']

         count++
         temp_hash[value.to_i] = hashelement['MaxTime'].to_i

         puts "MaxTime"
         puts hashelement['MaxTime']
         
         # if (hashelement['attr1'] > 1000)
         #   hashelement['attr1'] = 1 
         # else
         #   hashelement['attr1'] = 0 
         # end    
         #hashelement['attr1'] = 0 
       
     #    #hashelement['attr1'] = 1 

       }
       puts "hhhhhhhhhhhhhhhhhhhhhhhhhhhhh "
       puts temp_hash

       array = []
       array = temp_hash.keys

       puts "aaaaaaaaaaaaaaaaa"
       puts array

       array.sort!

       puts array

       cumulate_hour = 0

       hour_for_schedule = 16

       while(cumulate_hour < hour_for_schedule)
       
          if array.empty?
            break
          end
          finder = array.pop
          @spots.each{|hh|
              puts "spooooooooooooooooooooooooooot"
              puts "hh"
              puts hh['attr1']

              if(hh['attr1'] == finder)
                hh['attr1'] = 1
              end
          }  


          puts "finderrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
          puts finder
          cumulate_hour += temp_hash[finder]
       end

       puts array.empty?
       puts "cumu hrrrrrrrrrrrrrrr"
       puts cumulate_hour



    hash = {:test => "YOYO"}
    render json: @spots
  end
  def reload  # Can be deleted?!
    @schedule  = Schedule.find(params[:sid])
    @reload_or_not = true
    redirect_to :action => "index", :reload => @reload_or_not, :schedule=> @schedule
    #redirect_to home_path()
  end
  
  def share_schedule # Can be deleted?!
    #@reload = 22
    redirect_to home_path :share => params[:sid] 
        #render :partial => "index", :locals => { :name => "david" }
    
  end

  def share_backstage
    @shareuser = User.where(:fid => params[:fid])

    if( @shareuser[0] == nil)
        @user = User.new()
        @user[:fid] = params[:fid]
        @user[:name] = params[:uname]

    else
        @user = @shareuser[0]
    end

    if @user[:share_sid] == nil
      array = []
      array.push(params[:sid])
      @user[:share_sid] = array.to_json
    else
      @user[:share_sid] = params[:sid];

    end 
    @user.save

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



end