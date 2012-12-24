module Refinery
  module Ufptitle:strings
    class Ufptitle:stringsController < ::ApplicationController

      before_filter :find_all_ufptitle:strings
      before_filter :find_page

      def index
        # you can use meta fields from your model instead (e.g. browser_title)
        # by swapping @page for @ufptitle:string in the line below:
        present(@page)
      end

      def show
        @ufptitle:string = Ufptitle:string.find(params[:id])

        # you can use meta fields from your model instead (e.g. browser_title)
        # by swapping @page for @ufptitle:string in the line below:
        present(@page)
      end

    protected

      def find_all_ufptitle:strings
        @ufptitle:strings = Ufptitle:string.order('position ASC')
      end

      def find_page
        @page = ::Refinery::Page.where(:link_url => "/ufptitle:strings").first
      end

    end
  end
end
